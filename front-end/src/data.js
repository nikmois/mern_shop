import sliderPic1 from "./images/image.jpg";
import cat1 from "./images/cat1.jpg";
import cat2 from "./images/cat2.jpg";
import cat3 from "./images/cat3.jpg";
import slide1 from "./images/slide3.jpg";

export const sliderItems = [
    {
        id: 1,
        image: sliderPic1,
        title: "ДЕТСКАЯ ПОСУДА",
        desc: "Изготовленная из 100% пищевого силикона посуда для малышей является отличным выбором для введения первого прикорма", 
        bgImage: slide1,
    },
    {
        id: 2,
        image:  sliderPic1,
        title: "YOUR TEXT 1 BLA BLA BLA",
        desc: "BEST QUALITY KID'S TOYS AND DISHES", 
        bgImage: cat1,
    },
    {
        id: 3,
        image:  sliderPic1,
        title: "YOUR TEXT 2",
        desc: "BEST QUALITY KID'S TOYS AND DISHES", 
        bgImage: cat1,
    },
]

export const categories = [
    {
        id: 1,
        img: cat1,
        title: "SILICONE BABY TABLEWARE",
        cat:"tableware",
    },
    {
        id: 2,
        img: cat2,
        title: "EDUCATIONAL TOYS FOR CHILDREN",
        cat: "educational-toys",
    },
    {
        id: 3,
        img: cat3,
        title: "SILICONE TOYS FOR CHILDREN",
        cat: "silicone-toys",
    },
]
