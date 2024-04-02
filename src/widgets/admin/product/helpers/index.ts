import heic2any from 'heic2any';

export const getConvertedImageUrl = async (img: File): Promise<string> => {
	const blobURL = URL.createObjectURL(img);
	if (!/heic/i.test(img.name)) {
		return blobURL;
	}
	// convert "fetch" the new blob url
	const blobRes = await fetch(blobURL);

	// convert response to blob
	const blob = await blobRes.blob();

	const conversionResult = await heic2any({ blob });
	return URL.createObjectURL(conversionResult as Blob);
};
