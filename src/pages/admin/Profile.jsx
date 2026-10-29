import { useState } from "react";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RouteFallback } from "@/components/layout/RouteFallback";
import { useAdminProfile, useUpdateProfile } from "@/hooks/api/useProfile";

export default function AdminProfile() {
  const { data: profile, isLoading } = useAdminProfile();
  const updateMutation = useUpdateProfile();
  const [photo, setPhoto] = useState(null);

  if (isLoading) return <RouteFallback />;

  async function save() {
    if (!photo) return;
    try {
      await updateMutation.mutateAsync({ photo });
      setPhoto(null);
      toast.success("Photo updated — it's now live on the About page");
    } catch {
      toast.error("Couldn't upload the photo — use an image under 5 MB and try again.");
    }
  }

  async function remove() {
    try {
      await updateMutation.mutateAsync({ remove_photo: true });
      setPhoto(null);
      toast.success("Photo removed");
    } catch {
      toast.error("Couldn't remove the photo — try again.");
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">About Page Photo</h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        This is the portrait shown next to “My Story” on the About page. Without one, a generated placeholder is shown.
      </p>

      <Card className="mt-6 grid max-w-xl gap-6" hover={false}>
        <ImageUpload label="Profile photo" existingUrl={profile?.photo} onChange={setPhoto} />
        <p className="text-xs text-[var(--text-muted)]">A portrait (4:5) works best. Max 5 MB.</p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={save} disabled={!photo || updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save photo"}
          </Button>
          {profile?.photo && (
            <Button variant="secondary" onClick={remove} disabled={updateMutation.isPending}>
              Remove photo
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
