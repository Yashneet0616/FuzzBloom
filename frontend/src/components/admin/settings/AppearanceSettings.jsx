import { useRef, useState } from 'react'
import {
  Image,
  Monitor,
  Upload,
  Loader2,
} from 'lucide-react'
import { uploadImage } from '../../../services/cloudinaryService'

function AppearanceSettings({
  settings,
  onNestedChange,
  onArrayChange,
  onChange,
}) {
  const appearance = settings.appearance

  const [uploadingBanner, setUploadingBanner] = useState(false)
  const [uploadingSlider, setUploadingSlider] = useState(false)

  const bannerInputRef = useRef(null)
  const sliderInputRef = useRef(null)

  async function handleBannerUpload(e) {
    const file = e.target.files[0]

    if (!file) return

    try {
      setUploadingBanner(true)

      const url = await uploadImage(file)

      onChange('appearance', 'heroBanner', url)
    } catch (err) {
      console.error(err)
      alert('Failed to upload banner.')
    } finally {
      setUploadingBanner(false)
      e.target.value = ''
    }
  }

  async function handleSliderUpload(e) {
    const files = Array.from(e.target.files)

    if (!files.length) return

    try {
      setUploadingSlider(true)

      const uploaded = []

      for (const file of files) {
        const url = await uploadImage(file)
        uploaded.push(url)
      }

      onArrayChange('appearance', 'sliderImages', [
        ...(appearance.sliderImages || []),
        ...uploaded,
      ])
    } catch (err) {
      console.error(err)
      alert('Failed to upload images.')
    } finally {
      setUploadingSlider(false)
      e.target.value = ''
    }
  }

  function removeSliderImage(index) {
    const updated = appearance.sliderImages.filter(
      (_, i) => i !== index
    )

    onArrayChange(
      'appearance',
      'sliderImages',
      updated
    )
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <input
        ref={bannerInputRef}
        type="file"
        accept="image/*"
        onChange={handleBannerUpload}
        className="hidden"
      />

      <input
        ref={sliderInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleSliderUpload}
        className="hidden"
      />

      <div className="mb-6 flex items-center gap-3">
        <Monitor
          size={28}
          className="text-blue-500"
        />

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Website Appearance
          </h2>

          <p className="text-sm text-gray-500">
            Customize your website.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Banner */}

        <div className="rounded-xl border p-5">
          <h3 className="mb-4 font-semibold">
            Homepage Banner
          </h3>

          <div className="flex h-56 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
            {appearance.heroBanner ? (
              <img
                src={appearance.heroBanner}
                alt="Banner"
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                size={42}
                className="text-gray-400"
              />
            )}
          </div>

          <button
            type="button"
            disabled={uploadingBanner}
            onClick={() =>
              bannerInputRef.current?.click()
            }
            className="mt-5 flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-white hover:bg-rose-600 disabled:opacity-70"
          >
            {uploadingBanner ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} />
                Replace Banner
              </>
            )}
          </button>
        </div>

        {/* Homepage Slider */}

        <div className="rounded-xl border p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-semibold">
              Homepage Slider
            </h3>

            <button
              type="button"
              disabled={uploadingSlider}
              onClick={() =>
                sliderInputRef.current?.click()
              }
              className="flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-white hover:bg-rose-600 disabled:opacity-70"
            >
              {uploadingSlider ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Add Images
                </>
              )}
            </button>
          </div>

          {appearance.sliderImages?.length ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {appearance.sliderImages.map(
                (image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-xl border"
                  >
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="h-40 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeSliderImage(index)
                      }
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-300 py-12 text-center text-gray-500">
              No slider images uploaded.
            </div>
          )}
        </div>

        {/* Homepage Sections */}

        <div className="rounded-xl border p-5">
          <h3 className="mb-4 font-semibold">
            Homepage Sections
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['hero', 'Hero Banner'],
              ['categories', 'Categories'],
              ['featured', 'Featured Products'],
              ['testimonials', 'Testimonials'],
              ['newsletter', 'Newsletter'],
              ['footerOffer', 'Footer Offer'],
            ].map(([key, label]) => (
              <label
                key={key}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <span>{label}</span>

                <input
                  type="checkbox"
                  checked={appearance.sections[key]}
                  onChange={(e) =>
                    onNestedChange(
                      'appearance',
                      'sections',
                      key,
                      e.target.checked
                    )
                  }
                  className="h-5 w-5"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppearanceSettings