'use client'
import { visionTool } from '@sanity/vision'
import {
  apiVersion,
  dataset,
  PREVIEW_MODE_ROUTE,
  projectId,
} from 'lib/sanity.api'
import { locate } from 'plugins/locate'
import { previewDocumentNode } from 'plugins/previewPane'
import { settingsPlugin, settingsStructure } from 'plugins/settings'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import authorType from 'schemas/author'
import postType from 'schemas/post'
import settingsType from 'schemas/settings'
import revistaType from 'schemas/revista'
import bannerType from 'schemas/banner'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Blog with Sanity.io'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    types: [authorType, postType, settingsType, revistaType],
  },
  plugins: [
    structureTool({
      structure: settingsStructure(settingsType),
      defaultDocumentNode: previewDocumentNode(),
    }),
    presentationTool({
      locate,
      previewUrl: { previewMode: { enable: PREVIEW_MODE_ROUTE } },
    }),
    settingsPlugin({ type: settingsType.name }),
    unsplashImageAsset(),
    process.env.NODE_ENV !== 'production' &&
      visionTool({ defaultApiVersion: apiVersion }),
  ],
})
