import { Interface } from "readline";

export const heroSlider = {
    Slides: [
        {
            imgUrlDesktop: "https://cdn.prod.website-files.com/605826c62e8de87de744596e/63f5e30a4d577354fdfce512_Duotone-Master-ssssFile-copy.jpg", 
            imgUrlMobile: '',
            title: 'Slide 1',
            description: 'Description 1',
            buttonText: 'Button 1',
        },
        {
            imgUrlDesktop: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/a50a13168411771.644ea2a6b2810.jpg",
            imgUrlMobile: '',
            title: 'Slide 2',
            description: 'Description 2',
            buttonText: 'Button 2',
        }
    ],
};

interface Category {
    name: String,
    description?: String,
    imgUrl?: String,
}

export const Categories: Category[] = [
        {
            name: 'category 1' ,
            description: '',
            imgUrl: 'https://pre-live-admin.balwaan.com/uploads/media/2023/thumb-md/Harvesting.jpg',
        },
        {
            name: 'category 2' ,
            description: '',
            imgUrl: 'https://pre-live-admin.balwaan.com/uploads/media/2023/thumb-md/Land_preparation.jpg',
        },
        {
            name: 'category 3' ,
            description: '',
            imgUrl: 'https://pre-live-admin.balwaan.com/uploads/media/2023/thumb-md/Professional_Gardening.jpg',
        },

    ]
