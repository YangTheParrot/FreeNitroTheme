function u(e){window.enmity.plugins.registerPlugin(e)}function c(e){return window.enmity.patcher.create(e)}var a="FreeNitroTheme",m="1.1.0",l="Use Nitro Themes for free",p=[{name:"mafu",id:"519760564755365888"}],f="#800080",h={name:a,version:m,description:l,authors:p,color:f};function i(...e){return window.enmity.modules.getByProps(...e)}window.enmity.modules.common;function s(e,t,n){window.enmity.settings.set(e,t,n)}const d=i("updateBackgroundGradientPreset"),g=i("setShouldSyncAppearanceSettings"),r=i("canUseClientThemes",{defaultExport:!1}),o=c("FreeNitroTheme"),w={...h,onStart(){Object.isFrozen(r.default)&&(r.default={...r.default}),o.instead(r.default,"canUseClientThemes",(e,t,n)=>!0),o.after(d,"updateMobilePendingThemeIndex",(e,t,n)=>{g.setShouldSyncAppearanceSettings(!1),0<=t[0]&&t[0]<=2&&s(a,"theme",-1)}),o.after(d,"updateBackgroundGradientPreset",(e,t,n)=>{s(a,"theme",t[0])})},onStop(){o.unpatchAll()}};u(w);
