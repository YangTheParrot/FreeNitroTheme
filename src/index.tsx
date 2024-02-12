import {Plugin, registerPlugin} from 'enmity/managers/plugins'
import {create} from 'enmity/patcher'
// @ts-ignore
import manifest, {name as plugin_name} from '../manifest.json'
import {getByProps} from "enmity/modules"
import {get, set} from "enmity/api/settings"

// Make sure to disable "sync across clients"

const Themer = getByProps("updateBackgroundGradientPreset")
const UserSettings = getByProps("setShouldSyncAppearanceSettings")
// const EnableClientThemes = getByProps('canUseClientThemes');
const PermStat = getByProps("canUseClientThemes", {defaultExport: false});


const Patcher = create('FreeNitroThemes')

const FreeNitroThemes: Plugin = {
    ...manifest,
    onStart() {
        // disable theme sync (does not work - 4044)
        UserSettings.setShouldSyncAppearanceSettings(false)
        // Patcher.before(UserSettings, "setShouldSyncAppearanceSettings", (self, args, res) => {
        //     args[0] = false
        // })

        // make client theme available (rosie's snippet doesnt work consistently - 4044)
        // Patcher.instead(EnableClientThemes, 'canUseClientThemes', () => true)

        if (Object.isFrozen(PermStat.default)) {
            PermStat.default = {...PermStat.default}
        }
        // make client theme available
        Patcher.instead(PermStat.default, "canUseClientThemes", (_, args, __) => {
            return true
        })

        // detect theme selection
        Patcher.after(Themer, "updateMobilePendingThemeIndex", (_, args, __) => {
            UserSettings.setShouldSyncAppearanceSettings(false) // disable theme sync after theme change since it fails to deactivate on load - 4044
            // it uses mobileThemesIndex, which is different from presetId
            if (0 <= args[0] && args[0] <= 2) { // non nitro client theme
                set(plugin_name, "theme", -1)  // at this time, update background gradient preset won't be called. so I need to reset the value I store manually
            }
            // console.log(`change: ${args[0]}`)
        })

        // detect theme application
        Patcher.after(Themer, "updateBackgroundGradientPreset", (_, args, __) => {
            // on change or on apply at startup (uses presetId)
            // 8~19: dark / 0~7: light
            set(plugin_name, "theme", args[0])
            // console.log(`apply: ${args[0]}`)
        })
    },
    onStop() {
        Patcher.unpatchAll()
    }
}
registerPlugin(FreeNitroThemes)