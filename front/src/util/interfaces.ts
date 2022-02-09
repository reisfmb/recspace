interface IImageFormat {
    ext: string,
    hash: string,
    height: number,
    width: number,
    mime: string,
    name: string,
    path: string,
    size: string,
    url: string,
}

export interface IImage {
    id: number,
    attributes: {
        formats: {
            large: IImageFormat,
            medium: IImageFormat,
            small: IImageFormat,
            thumbnail: IImageFormat
        }
    }
}

export interface IAudio {
    id: number,
    attributes: {
        caption: string,
        mime: string,
        url: string
    }
}

export interface ILocutionType {
    id: number,
    attributes: {
        type: string
    }
}

export interface ITalent {
    id: number,
    attributes: {
        name: string,
        surname?: string,
        email: string,
        gender: 'masculino' | 'feminino',
        description: string,
        images: {
            data: Array<IImage>
        },
        audios: {
            data: Array<IAudio>
        },
        locution_types: {
            data: Array<ILocutionType>
        }
    }
}

export interface IPageHome {
    id: number,
    attributes: {
        faq: Array<{
            question: string,
            answer: string,
        }>,
        text: string
    }
}

export interface IPageAbout {
    id: number,
    attributes: {
        image: { data: IImage },
        text: string
    }
}