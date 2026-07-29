import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { TagInput } from "@/components/admin/TagInput";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RouteFallback } from "@/components/layout/RouteFallback";
import { useAdminResource } from "@/hooks/api/useAdminResource";

const { useOne, useCreate, useUpdate } = useAdminResource("products");

function emptyTier() {
  return { tier: "", price: 0, period: "mo", features: [] };
}

function PricingTiersEditor({ tiers, onChange }) {
  function updateTier(i, patch) {
    onChange(tiers.map((t, idx) => (idx === i ? { ...t, ...patch } : t)));
  }
  function removeTier(i) {
    onChange(tiers.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[var(--text-muted)]">Subscription Tiers</label>
        <Button type="button" size="sm" variant="secondary" icon={<FiPlus size={14} />} onClick={() => onChange([...tiers, emptyTier()])}>
          Add Tier
        </Button>
      </div>
      {tiers.map((tier, i) => (
        <div key={i} className="grid gap-3 rounded-xl border border-[var(--border)] p-4 sm:grid-cols-4">
          <Input label="Tier Name" value={tier.tier} onChange={(e) => updateTier(i, { tier: e.target.value })} />
          <Input label="Price" type="number" value={tier.price} onChange={(e) => updateTier(i, { price: Number(e.target.value) })} />
          <Input label="Period" value={tier.period} onChange={(e) => updateTier(i, { period: e.target.value })} />
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => removeTier(i)}
              className="flex h-11 items-center gap-2 rounded-xl border border-[var(--border)] px-3 text-sm text-red-500 hover:border-red-500"
            >
              <FiTrash2 size={14} /> Remove
            </button>
          </div>
          <div className="sm:col-span-4">
            <TagInput label="Tier Features" value={tier.features} onChange={(features) => updateTier(i, { features })} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { data: product, isLoading } = useOne(id);
  const createMutation = useCreate();
  const updateMutation = useUpdate();

  const { register, handleSubmit, reset } = useForm();
  const [features, setFeatures] = useState([]);
  const [tiers, setTiers] = useState([]);
  const [oneTimePrice, setOneTimePrice] = useState("");
  const [hasFreeTrial, setHasFreeTrial] = useState(false);
  const [hasDocs, setHasDocs] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [cover, setCover] = useState(null);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    if (!product) return;
    reset({
      category: product.category ?? "",
      name: product.name ?? "",
      tagline: product.tagline ?? "",
      demo_url: product.demoUrl ?? "",
      rating: product.rating ?? 0,
      reviews_count: product.reviews ?? 0,
    });
    setFeatures(product.features ?? []);
    setTiers(product.pricing?.subscription ?? []);
    setOneTimePrice(product.pricing?.oneTime?.price ?? "");
    setHasFreeTrial(Boolean(product.hasFreeTrial));
    setHasDocs(Boolean(product.hasDocs));
    setIsPublished(Boolean(product.published));
  }, [product, reset]);

  if (isEdit && isLoading) return <RouteFallback />;

  async function onSubmit(fields) {
    const payload = {
      ...fields,
      features,
      pricing: {
        oneTime: oneTimePrice !== "" ? { price: Number(oneTimePrice), currency: "USD" } : null,
        subscription: tiers,
      },
      has_free_trial: hasFreeTrial,
      has_docs: hasDocs,
      is_published: isPublished,
      ...(cover ? { cover } : {}),
      ...(gallery.length ? { gallery } : {}),
    };

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id, payload });
        toast.success("Product updated");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Product created");
      }
      navigate("/admin/products");
    } catch {
      toast.error("Couldn't save product — check the form and try again.");
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <button
        onClick={() => navigate("/admin/products")}
        className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-primary"
      >
        <FiArrowLeft size={14} /> All Products
      </button>

      <h1 className="mt-4 font-display text-2xl font-bold">{isEdit ? "Edit Product" : "New Product"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <Card className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" {...register("name", { required: true })} />
          <Input label="Category" {...register("category")} />
          <div className="sm:col-span-2">
            <Input label="Tagline" {...register("tagline")} />
          </div>
          <div className="sm:col-span-2">
            <TagInput label="Features" value={features} onChange={setFeatures} />
          </div>
          <Input label="Demo URL" {...register("demo_url")} />
          <Input label="Rating" type="number" step="0.1" min="0" max="5" {...register("rating")} />
          <Input label="Reviews Count" type="number" {...register("reviews_count")} />
        </Card>

        <Card className="space-y-5">
          <Input
            label="One-Time License Price (USD, leave blank for none)"
            type="number"
            value={oneTimePrice}
            onChange={(e) => setOneTimePrice(e.target.value)}
          />
          <PricingTiersEditor tiers={tiers} onChange={setTiers} />
        </Card>

        <Card className="grid gap-6">
          <ImageUpload label="Cover Image" existingUrl={product?.cover} onChange={setCover} />
          <ImageUpload label="Gallery" multiple onChange={setGallery} />
        </Card>

        <Card className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={hasFreeTrial} onChange={(e) => setHasFreeTrial(e.target.checked)} />
            Free Trial
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={hasDocs} onChange={(e) => setHasDocs(e.target.checked)} />
            Has Docs
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
            Published
          </label>
        </Card>

        <Button type="submit" size="lg" disabled={isSaving}>
          {isSaving ? "Saving..." : isEdit ? "Save Changes" : "Create Product"}
        </Button>
      </form>
    </div>
  );
}
