// Import necessary libraries
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Main App component
function VerfyDoc() {
    // State to manage checkbox states and page transitions
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Function to handle next button click
    const handleNextClick = () => {
        if (currentPage === 1 && selectedOption !== null) {
            setCurrentPage(selectedOption === 'option1' ? 2 : 3)
        }
    };

    // Function to handle "Done" button click
    const handleDoneClick = () => {
        // Handle any additional logic for "Done" button click if needed
        // For example, you might want to perform some action or reset state
    };

    return (
        <div className='parent'>
            {/* Page 1 */}
            {currentPage === 1 && (
                <div className="page">
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

            {/* Page 2 - Content based on checkbox selection */}
            {currentPage === 2 && (
                <div className="page transition">
                    <h2 className='heading'>Manual Verfication</h2>
                    <p>your address willl be verified into six to seven business days</p>
                    <p>we will notify you. when its done</p>

                    <p className='thanks'>Thank you!</p>
                    <button onClick={() => navigate('/people')}>Done</button>
                </div>
            )}

            {/* Page 3 - Content based on checkbox selection */}
            {currentPage === 3 && (
                <div className="page transition">
                    <h2 className='heading'>Govenment Id proof</h2>
                    <label htmlFor="">
                        upload aadhar card:
                        <input type="file" />

                    </label>
                    <label htmlFor="">
                        upload aadhar card:
                        <input type="file" />

                    </label>
                    {/* <p>Wait for a few hours.</p> */}
                    <button onClick={handleDoneClick}>Done</button>
                </div>
            )}
        </div>
    );
}

export default VerfyDoc;


