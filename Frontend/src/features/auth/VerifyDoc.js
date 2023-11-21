// Import necessary libraries
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGenerateSignatureMutation, useUploadDocumentUrlMutation } from './authApiSlice';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';

function VerfyDoc() {
    const errRef = useRef()
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [aadhar, setAadhar] = useState(null);
    const [pan, setPan] = useState(null);
    const [errMsg, setErrMsg] = useState('')
    const [loading, setLoading] = useState(false);

    const [generateSignature, { isLoading: generateLoading, isSuccess: generateSuccess }] = useGenerateSignatureMutation()
    const [uploadDocumentUrl, { isLoading: uploadLoading, isSuccess: uploadSuccess }] = useUploadDocumentUrlMutation()
    // Function to handle next button click
    const errClass = errMsg ? "errmsg" : "offscreen"


    const handleNextClick = () => {
        console.log('click')
        if (currentPage === 1 && selectedOption !== null) {
            setCurrentPage(selectedOption === 'option1' ? 2 : 3)
        } else {
            setErrMsg('Select at least one option')
        }
        console.log(errMsg)
    };

    useEffect(() => {
        setErrMsg('')
    }, [pan, aadhar,currentPage])


    useEffect(() => {
        if (generateSuccess && uploadSuccess) {
            setPan(null)
            setAadhar(null)
            navigate('/people')
            console.log("redirect to people page from verfiy")
        }
    }, [generateSuccess, uploadSuccess, navigate])


    const handleGenerateSignature = async (folder) => {
        try {
            const res = await generateSignature({ folder }).unwrap()
            // console.log(res)
            return res
        } catch (error) {
            console.log(error)
            if (!error.status) {
                setErrMsg('No server Response');
            }
            else {
                setErrMsg(error?.data?.message)
            }
            errRef.current.focus()
        }
    }



    const uploadFile = async (folder, timestamp, signature, filename) => {
        const data = new FormData()
        data.append("file", filename)
        data.append("timestamp", timestamp)
        data.append("signature", signature)
        data.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY)
        data.append("folder", folder)
        // console.log(data)
        try {
            let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME

            let resourceType = 'image'
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

            const res = await axios.post(api, data);
            // console.log(res)
            return res;
        } catch (error) {
            // console.log(error.message);,
            console.log(error)
            setLoading(false)
            if (error?.response?.status === 400) {
                setErrMsg(error?.message)
            }
            errRef.current.focus()
        }

    }

    // Function to handle "Done" button click
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (pan === null || aadhar === null) {
                setErrMsg('All field required')
                return
            }
            // generate timestamp for aadhar
            // setLoading(true);
            const { timestamp: aadharTimestamp, signature: aadharSignature } = await handleGenerateSignature('pdf')
            const { timestamp: panTimestamp, signature: panSignature } = await handleGenerateSignature('pdf')
            // console.log(aadharSignature+" "+aadharTimestamp)
            // console.log(panSignature+" "+panTimestamp)
            setLoading(true)


            const aadharUrl = await uploadFile('pdf', aadharTimestamp, aadharSignature, aadhar)
            const panUrl = await uploadFile('pdf', panTimestamp, panSignature, pan)

            // if(aadharUrl.status!==200 || panUrl.status!==200){
            //     console.log("err h bhjai")
            // }

            // console.log(aadharUrl.data.secure_url)
            // console.log(panUrl.data.secure_url)
            const aurl = aadharUrl.data.secure_url;
            const purl = panUrl.data.secure_url;
            console.log(aurl)
            console.log(purl)
            setLoading(false)

            await uploadDocumentUrl({ aurl, purl });

            // setLoading(false)

        } catch (error) {
            console.log(error)
            if (!error.status) {
                setErrMsg('No server Response');
            }
            else {
                setErrMsg(error?.data?.message)
            }
            errRef.current.focus()
        }
    };

    const content = (
        <div className='parent'>
            {/* Page 1 */}
            {currentPage === 1 && (
                <div className="page">
                    <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                    <h2 className='heading'>Verification</h2>
                    <label htmlFor="manual">
                        Manual(postman)
                        <input
                            type="radio"
                            name='verification'
                            id='manual'
                            value="option1"
                            checked={selectedOption === 'option1'}
                            onChange={() => setSelectedOption('option1')}
                        />
                    </label>
                    <label htmlFor="automatic">
                        Govenment proof ID
                        <input
                            type="radio"
                            name='verification'
                            id='automatic'
                            value="option2"
                            checked={selectedOption === 'option2'}
                            onChange={() => setSelectedOption('option2')}
                        />
                    </label>
                    <button onClick={() => navigate('/people')}>Skip</button>
                    <button onClick={handleNextClick}>Next</button>
                </div>
            )}

            {/* Page 2 - manual verfication page */}
            {currentPage === 2 && (
                <div className="page transition">
                    <h2 className='heading'>Manual Verfication</h2>
                    <p>your address willl be verified into six to seven business days</p>
                    <p>we will notify you. when its done</p>

                    <p className='thanks'>Thank you!</p>
                    <button onClick={() => setCurrentPage(1)}>Back</button>
                    <button onClick={() => navigate('/people')}>Done</button>
                </div>
            )}

            {/* Page 3 - government id verfication page*/}
            {currentPage === 3 && (
                <div className="page transition">
                    <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                    <form onSubmit={handleSubmit}>
                        <h2 className='heading'>Govenment Id proof</h2>
                        <label htmlFor="aadhar">
                            upload aadhar card:
                            <input
                                type="file"
                                id="aadhar"
                                accept="application/pdf"
                                onChange={(e) => setAadhar((prev) => e.target.files[0])}
                            />

                        </label>
                        <label htmlFor="pan">
                            upload PAN card:
                            <input
                                type="file"
                                id='pan'
                                accept="application/pdf"
                                onChange={(e) => setPan((prev) => e.target.files[0])}
                            />

                        </label>
                        <button onClick={() => setCurrentPage(1)}>Back</button>
                        <button type='submit'>Done</button>
                    </form>
                </div>
            )}
        </div>
    )

    if (uploadLoading || generateLoading) return <PulseLoader color={"#122738"} />

    if (loading) {
        return <p>loadins..</p>
    }

    return content
}

export default VerfyDoc;


