import React, { useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';

import JoditEditor from "jodit-react";

export interface ITest {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
}

function test() {


    // const editor = useRef(null)
    // const [content, setContent] = useState('')

    // const config = {
    //     readonly: false // all options from https://xdsoft.net/jodit/doc/
    // }


    let d1: Date = new Date();

    return (

        <div>
            {/* <h1>Date {d1.toISOString().split('T')[0]} - Time : {d1.getTime()} </h1> */}

            {/* <JoditEditor
                ref={editor}
                value={content}
                config={config}
                //tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => { }}
            /> */}

        </div>
    )
}

export default test
