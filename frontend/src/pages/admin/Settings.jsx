import { useEffect, useState } from 'react'

import AppearanceSettings from '../../components/admin/settings/AppearanceSettings'
import AnnouncementSettings from '../../components/admin/settings/AnnouncementSettings'
import ContactSettings from '../../components/admin/settings/ContactSettings'
import PolicySettings from '../../components/admin/settings/PolicySettings'
import AccountSettings from '../../components/admin/settings/AccountSettings'
import SaveSettings from '../../components/admin/settings/SaveSettings'

import {
  getSettings,
  saveSettings,
} from '../../services/settingsService'

function Settings() {
  const [settings, setSettings] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    const data = await getSettings()
    setSettings(data)
  }

  function handleChange(section, field, value) {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  function handleNestedChange(section, group, field, value) {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [group]: {
          ...prev[section][group],
          [field]: value,
        },
      },
    }))
  }

  function handleArrayChange(section, field, value) {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  async function handleSave() {
    try {
      setSaving(true)

      await saveSettings(settings)

      alert('Settings saved successfully.')
    } catch (error) {
      console.error(error)
      alert('Failed to save settings.')
    } finally {
      setSaving(false)
    }
  }

  if (!settings) {
    return (
      <div className="flex h-60 items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your website settings.
        </p>
      </div>

      <AppearanceSettings
        settings={settings}
        onChange={handleChange}
        onNestedChange={handleNestedChange}
        onArrayChange={handleArrayChange}
      />

      <AnnouncementSettings
        settings={settings}
        onChange={handleChange}
      />

      <ContactSettings
        settings={settings}
        onChange={handleChange}
      />

      <PolicySettings
        settings={settings}
        onChange={handleChange}
      />

      <AccountSettings />

      <SaveSettings
        saving={saving}
        onSave={handleSave}
      />
    </div>
  )
}

export default Settings