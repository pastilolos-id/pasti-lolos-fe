"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationsSocketUrl } from "@/lib/notifications/getNotificationsSocketUrl";
import { notificationsApi } from "@/lib/redux/api/notificationsApi";
import type { AppDispatch, RootState } from "@/lib/redux/store";

function looksLikeNotificationPayload(o: Record<string, unknown>): boolean {
  if (
    typeof o.id === "number" &&
    typeof o.title === "string" &&
    typeof o.message === "string"
  ) {
    return true;
  }
  if (Array.isArray(o.data) && o.data.length > 0) {
    const first = o.data[0];
    if (first && typeof first === "object") {
      return looksLikeNotificationPayload(first as Record<string, unknown>);
    }
  }
  return false;
}

function shouldInvalidateOnSocketPayload(data: unknown): boolean {
  if (data == null || typeof data !== "object") {
    return false;
  }
  const o = data as Record<string, unknown>;
  if (looksLikeNotificationPayload(o)) {
    return true;
  }
  if ("notification" in o || "notifications" in o) {
    return true;
  }
  if (
    typeof o.event === "string" &&
    o.event.toLowerCase().includes("notification")
  ) {
    return true;
  }
  if (typeof o.id === "number" && o.isRead === true) {
    return true;
  }
  if (
    typeof o.type === "string" &&
    o.type.toLowerCase().includes("notification")
  ) {
    return true;
  }
  if (o.payload && typeof o.payload === "object") {
    return shouldInvalidateOnSocketPayload(o.payload);
  }
  return false;
}

export default function NotificationsRealtimeBridge() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((s: RootState) => s.user.isAuthenticated);
  const userId = useSelector((s: RootState) => s.user.user.id);
  const dispatchRef = useRef(dispatch);
  dispatchRef.current = dispatch;

  useEffect(() => {
    if (!isAuthenticated || userId === 0) {
      return;
    }

    const url = getNotificationsSocketUrl();
    if (!url) {
      return;
    }

    let cancelled = false;
    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
    let ws: WebSocket | null = null;
    let attempt = 0;

    const invalidate = () => {
      dispatchRef.current(
        notificationsApi.util.invalidateTags([{ type: "Notifications" }]),
      );
    };

    const connect = () => {
      if (cancelled) {
        return;
      }
      ws = new WebSocket(url);

      ws.onopen = () => {
        attempt = 0;
      };

      ws.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data as string);
          if (shouldInvalidateOnSocketPayload(parsed)) {
            invalidate();
          }
        } catch {
          // Non-JSON frames (e.g. ping) are ignored.
        }
      };

      ws.onclose = () => {
        ws = null;
        if (cancelled) {
          return;
        }
        const delay = Math.min(30_000, 1000 * 2 ** attempt);
        attempt += 1;
        reconnectTimer = setTimeout(connect, delay);
      };

      ws.onerror = () => {
        ws?.close();
      };
    };

    connect();

    return () => {
      cancelled = true;
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
      ws?.close();
    };
  }, [isAuthenticated, userId]);

  return null;
}
