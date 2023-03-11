import html2canvas from "html2canvas";

const exportAsImage = async (el: any) => {
    const canvas = await html2canvas(el);

    const image = canvas.toBlob((b) => {
            if (b) {
                window.open(URL.createObjectURL(b), "_blank")
                const item = new ClipboardItem({"image/png": b});
                navigator.clipboard.write([item]);
            }
        }
    );
};

export default exportAsImage;