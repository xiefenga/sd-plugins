import fs from 'node:fs'
import { PLUGIN_PACKAGE_PATH, PLUGIN_CONFIG_PATH, PLUGIN_INDEX_TEMPLATE } from './paths'

export const PKG = require(PLUGIN_PACKAGE_PATH)

export const PLUGIN_JSON = require(PLUGIN_CONFIG_PATH)

export const SCRIPT_COMMANDS = ['init', 'start', 'build', 'pack']

export const PLUGIN_ENTRY_TEMPLATE = fs.readFileSync(PLUGIN_INDEX_TEMPLATE, 'utf-8')
