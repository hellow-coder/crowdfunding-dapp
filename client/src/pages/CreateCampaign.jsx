import { useState, useRef } from "react";
import {
  Upload,
  ImageIcon,
  X,
  Calendar,
  Target,
  Tag,
  FileText,
  Rocket,
} from "lucide-react";

const categories = [
  "Small Business",
  "Education",
  "Medical",
  "Creative",
  "Social Good",
  "Technology",
  "Relief",
];

export default function CreateCampaign() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    goal: "",
    deadline: "",
    category: "",
  });
  const [image, setImage] = useState(null); // { file, preview }
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const preview = URL.createObjectURL(file);
    setImage({ file, preview });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleBrowse = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const removeImage = () => {
    if (image?.preview) URL.revokeObjectURL(image.preview);
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Campaign submitted:", {
      ...form,
      image: image?.file ?? null,
    });
  };

  const isValid =
    form.title && form.description && form.goal && form.deadline && form.category;

  return (
    <section className="relative w-full px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Launch your campaign
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
            Tell people what
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {" "}
              you're building.
            </span>
          </h2>
          <p className="mt-3 text-slate-400">
            Set a goal, a deadline, and let backers fund it directly — on-chain.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-9"
        >
          {/* Image upload */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <ImageIcon className="h-4 w-4 text-violet-400" />
              Campaign image
            </label>

            {!image ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
                  isDragging
                    ? "border-violet-400 bg-violet-500/10"
                    : "border-white/15 bg-white/[0.02] hover:border-white/25"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10">
                  <Upload className="h-5 w-5 text-violet-300" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Drag & drop an image, or{" "}
                    <span className="text-violet-400 underline underline-offset-2">
                      browse
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    PNG, JPG up to 5MB · recommended 1200×630
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleBrowse}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="group relative overflow-hidden rounded-xl border border-white/10">
                <img
                  src={image.preview}
                  alt="Campaign preview"
                  className="h-56 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="absolute bottom-3 left-3 text-xs text-white/80">
                  {image.file.name}
                </p>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="mt-6">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <FileText className="h-4 w-4 text-violet-400" />
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Mera Chai Ka Thela"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-violet-400/50"
            />
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <FileText className="h-4 w-4 text-violet-400" />
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Nagpur me chai thela kholna hai..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-violet-400/50"
            />
          </div>

          {/* Category */}
          <div className="mt-6">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <Tag className="h-4 w-4 text-violet-400" />
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setForm((prev) => ({ ...prev, category: cat }))}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                    form.category === cat
                      ? "border-violet-400/60 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Goal + Deadline */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                <Target className="h-4 w-4 text-violet-400" />
                Funding goal (ETH)
              </label>
              <input
                type="number"
                name="goal"
                step="0.01"
                min="0"
                value={form.goal}
                onChange={handleChange}
                placeholder="0.5"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-violet-400/50"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                <Calendar className="h-4 w-4 text-violet-400" />
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors [color-scheme:dark] focus:border-violet-400/50"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Rocket className="h-4 w-4" />
            Launch campaign
          </button>
        </form>
      </div>
    </section>
  );
}