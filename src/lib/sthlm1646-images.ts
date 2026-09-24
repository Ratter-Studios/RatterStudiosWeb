import { websiteImg } from "@/lib/assets";

// New images go in img/website/games/sthlm1646/ and get listed here.
const img = (file: string) => websiteImg(`games/sthlm1646/${file}`);

/** Backdrop on Home, Our Games and /sthlm1646, and top of the /sthlm1646 gallery. */
export const keyart: string | undefined = img("keyart.jpeg");

/** Gallery on /sthlm1646; Home shows the first three. */
export const shots: string[] = [
    img("shot1.jpeg"),
    img("shot2.jpeg"),
    img("shot3.jpeg"),
    img("shot4.jpeg"), 
    img("shot5.jpeg"),
    img("shot6.jpeg"),
    img("shot7.jpeg"),
    
];

/** Only shown in the "Older images" dropdown on /sthlm1646. */
export const oldShots = [
  "webTitle",
  "devCapture1",
  "devCapture2",
  "devCapture3",
  "devCapture4",
  "devCapture5",
].map((n) => img(`old/${n}.jpeg`));
