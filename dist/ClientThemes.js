function c(e){window.enmity.plugins.registerPlugin(e)}function u(e){return window.enmity.patcher.create(e)}var i="ClientThemes",m="1.0.1",l="Use Nitro Themes for free",p=[{name:"mafu",id:"519760564755365888"},{name:"SerStars",id:"861631850681729045"}],h="#000001",g={name:i,version:m,description:l,authors:p,color:h};function s(...e){return window.enmity.modules.getByProps(...e)}window.enmity.modules.common;function o(e,n,r){window.enmity.settings.set(e,n,r)}const a=s("updateBackgroundGradientPreset"),d=s("setShouldSyncAppearanceSettings"),S=s("canUseClientThemes"),t=u("ClientThemes"),f={...g,onStart(){d.setShouldSyncAppearanceSettings(!1),t.before(d,"setShouldSyncAppearanceSettings",(e,n,r)=>{n[0]=!1}),t.instead(S,"canUseClientThemes",()=>!0),t.after(a,"updateMobilePendingThemeIndex",(e,n,r)=>{0<=n[0]&&n[0]<=2&&o(i,"theme",-1)}),t.after(a,"updateBackgroundGradientPreset",(e,n,r)=>{o(i,"theme",n[0])})},onStop(){t.unpatchAll()}};c(f);
