"use client";

import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui";
import type { RootState } from "@/lib/redux/store";
import { getAvatarInitials } from "@/lib/utils/avatarInitials";
import { mapProfileFromState } from "../mapProfileFromState";
import ProfileEditPage from "../ProfileEditPage";

function ProfileInfoRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="grid grid-cols-1 gap-1 rounded-2xl border border-neutral-3 bg-white px-4 py-3 sm:grid-cols-[180px_1fr]">
      <p className="text-c1 text-neutral-5">{label}</p>
      <p className="text-b3 font-medium text-neutral-6 break-words">{value}</p>
    </div>
  );
}

export default function ProfilePage() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const user = useSelector((state: RootState) => state.user.user);
  const profile = mapProfileFromState(user);

  useEffect(() => {
    if (!feedback) return;

    const timer = setTimeout(() => {
      setFeedback(null);
    }, 3500);

    return () => clearTimeout(timer);
  }, [feedback]);

  return (
    <section className="rounded-card-medium border border-neutral-3 bg-neutral-1 p-4 sm:p-6">
      {!profile.hasProfileData ? (
        <div className="text-center">
          <h1 className="text-h4 font-semibold text-neutral-6">Profile</h1>
          <p className="mt-3 text-b3 text-neutral-5">
            Data profile tidak tersedia. Lengkapi profile kamu terlebih dahulu.
          </p>
          <Button onClick={() => setOpenEditModal(true)} className="mt-5">
            Edit Profile
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-start gap-4 border-b border-neutral-3 pb-5 sm:flex-row sm:items-center">
            <Avatar className="size-20 border border-neutral-3">
              <AvatarImage
                src={profile.profilePictureUrl ?? undefined}
                alt={profile.fullName}
              />
              <AvatarFallback className="text-b2">
                {getAvatarInitials(
                  profile.fullName !== "-"
                    ? profile.fullName
                    : profile.username,
                )}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-h4 font-semibold text-neutral-6">
                {profile.fullName}
              </h1>
              <p className="mt-1 text-b3 text-neutral-5">@{profile.username}</p>
            </div>
            <Button
              onClick={() => setOpenEditModal(true)}
              className="sm:ml-auto"
            >
              Edit Profile
            </Button>
          </div>

          <div className="mt-5 grid gap-3">
            <ProfileInfoRow label="ID User" value={profile.id || "-"} />
            <ProfileInfoRow label="Email" value={profile.email} />
            <ProfileInfoRow label="Username" value={profile.username} />
            <ProfileInfoRow label="Nama Depan" value={profile.firstName} />
            <ProfileInfoRow label="Nama Belakang" value={profile.lastName} />
            <ProfileInfoRow label="Nama Lengkap" value={profile.fullName} />
            <ProfileInfoRow
              label="Nomor Handphone"
              value={profile.phoneNumber}
            />
            <ProfileInfoRow label="Alamat" value={profile.address} />
            <ProfileInfoRow label="Kota" value={profile.city} />
            <ProfileInfoRow label="Provinsi" value={profile.province} />
            <ProfileInfoRow label="Negara" value={profile.country} />
            <ProfileInfoRow label="Kode Pos" value={profile.postalCode} />
            <ProfileInfoRow label="Tanggal Lahir" value={profile.dateOfBirth} />
            <ProfileInfoRow label="Jenis Kelamin" value={profile.gender} />
            <ProfileInfoRow label="Status" value={profile.status} />
            <ProfileInfoRow label="Role" value={profile.roleLabel} />
          </div>
        </>
      )}

      <Sheet open={openEditModal} onOpenChange={setOpenEditModal}>
        <SheetContent
          side="center"
          className="overflow-y-auto border-neutral-3 bg-white p-6 shadow-2xl sm:p-7"
        >
          <SheetHeader className="px-0 pb-5">
            <SheetTitle className="text-h4 text-neutral-6">
              Edit Profile
            </SheetTitle>
            <SheetDescription className="text-b3 text-neutral-5">
              Isi field yang ingin diperbarui. Tidak harus semua field diisi.
            </SheetDescription>
          </SheetHeader>
          <ProfileEditPage
            showWrapper={false}
            onSuccess={() => setOpenEditModal(false)}
            onResult={(result) => setFeedback(result)}
          />
        </SheetContent>
      </Sheet>

      {feedback ? (
        <div className="fixed right-4 top-4 z-[60] w-[calc(100%-2rem)] max-w-md">
          <Alert
            variant={feedback.type === "error" ? "destructive" : "default"}
            className="relative border shadow-xl"
          >
            {feedback.type === "error" ? (
              <AlertCircle className="col-start-1 row-start-1" aria-hidden />
            ) : (
              <CheckCircle2
                className="col-start-1 row-start-1 text-primary-4"
                aria-hidden
              />
            )}
            <AlertTitle>
              {feedback.type === "error"
                ? "Gagal memperbarui profile"
                : "Profile berhasil diperbarui"}
            </AlertTitle>
            <AlertDescription>{feedback.message}</AlertDescription>
            <button
              type="button"
              className="absolute right-2 top-2 rounded p-1 text-neutral-5 hover:bg-neutral-2"
              onClick={() => setFeedback(null)}
            >
              <X className="size-4" />
            </button>
          </Alert>
        </div>
      ) : null}
    </section>
  );
}
