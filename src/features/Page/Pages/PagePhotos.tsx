import React, { useContext, useState, useEffect } from 'react'
import { useFormikContext } from 'formik';
import { Uploader, Icon } from 'rsuite';
import { RootStoreContext } from '../../../app/store/rootStore';


const updatePhotoList = (list: any[]) => {
    let newList: any = [];
    list.forEach((item) => {
        let photo: any = {};
        photo.Id = item.Id;
        photo.url = item.Url;
        newList.push(photo);
    })

    return newList;
}

const PagePhotos: React.FC<{ Id?: string, name: string, imageList: any }> = ({ Id = "", name, imageList }) => {

    const { setFieldTouched, handleChange, errors, setFieldValue, touched, values, validateField } = useFormikContext();
    const [images, updateImages] = useState(updatePhotoList([]));
    const [t, setT] = useState(false)

    const rootStore = useContext(RootStoreContext);
    const {
        uploadPhoto
    } = rootStore.pageStore;

    useEffect(() => {

        if (imageList.length > 0) {
            //debugger;
            updateImages(updatePhotoList(imageList));
        }

    }, [imageList])

    const onPhotoChange = (values: any) => {
        values.forEach((file: any) => {
            if (file.blobFile) {
                uploadPhoto(Id, file.blobFile).then((res) => {
                    debugger;
                    console.log(res);

                    let photo: any = {};
                    photo.Id = res?.Id;
                    photo.url = res?.Url;
                    images.push(photo);
                    updateImages(images);

                    // let photo: any = {};
                    // photo.Id = "11";
                    // photo.url = "https://res.cloudinary.com/dzcblkurm/image/upload/v1594494739/e4patldk0hri4lm07jjt.png";
                    // images.push(photo);
                    // updateImages(images);

                    setT(!t);
                })
            }
        });

        // let photo: any = {};
        // photo.Id = "11";
        // photo.url = "https://res.cloudinary.com/dzcblkurm/image/upload/v1594494739/e4patldk0hri4lm07jjt.png";
        // images.push(photo);
        // updateImages(images);

    }

    const photoRemove = (values: any) => {
        debugger;
        console.log(values);
    }

    return (
        <Uploader multiple listType="picture" onChange={onPhotoChange} fileList={images} onRemove={photoRemove}  >
            <button>
                <Icon icon='camera-retro' size="lg" />
            </button>
        </Uploader>
    )
}

export default PagePhotos;