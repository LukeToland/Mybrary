FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
)
FilePond.setOptions({
    stylePanelAspectRatio: 150 / 100,
    imageSizeTargetWidth: 100,
    imageSizeTargetHeight: 150
})
FilePond.parse(document.body);