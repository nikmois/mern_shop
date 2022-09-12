import cat1 from "./images/cat1.webp";
import cat2 from "./images/cat2.webp";
import cat3 from "./images/cat3.webp";
import slide1 from "./images/slide3.webp";
import slide3 from "./images/slide4.webp";

export const sliderItems = [
    {
        id: 1,
        title: "ARENDAVAD MÄNGUASJAD",
        desc: "Arendab visuaal-motoorset koordinatsiooni, kujutlusvõimet ja matemaatika põhitõdesid.", 
        bgImage: slide1,
    },
    {
        id: 2,
        title: "LASTENÕUD",
        desc: "100% toidukvaliteediga silikoonist valmistatud beebiriistad on suurepärane valik esimeste toitude tutvustamiseks.", 
        bgImage: cat1,
    },
    {
        id: 3,
        title: "SILIKOONIST MÄNGUASJAD",
        desc: "Silikoonist mänguasjad on 100% keemiavabad ning disainitud kahes osas, et mänguasjad oleks hügieenilised, hästi puhastatavad ja hallitusvabad.", 
        bgImage: slide3,
    },
]

export const categories = [
    {
        id: 1,
        img: cat1,
        title: "SILIKOONIST BEEBI NÕUD",
        cat:"tableware",
    },
    {
        id: 2,
        img: cat2,
        title: "ARENDAVAD MÄNGUASJAD",
        cat: "educational-toys",
    },
    {
        id: 3,
        img: cat3,
        title: "SILIKOONIST MÄNGUASJAD",
        cat: "silicone-toys",
    },
]
