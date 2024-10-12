import axios from "axios";
import React, { useState } from "react";
import * as XLSX from 'xlsx';
import { useGlobalSkills } from "../context/skillContext";
import { monthNames } from "../staticData/MonthArray";

const Result = () => {
    const { updatedAdArray, chartAll } = useGlobalSkills()
    const initialState = {
        year: "",
        month: "",
        file: null
    };
    const initialState_DirectUpload = {
        date: "",
        delhiLuckyBazar: "",
        disawer: "",
        faridabad: "",
        gaziyabad: "",
        kolkataKing: "",
        gali: "",
        delhiBazar: "",
        shreeGanesh: "",



    };
    const [post, setPost] = useState("");
    const [edit, setEdit] = useState("")


    const [formData, setFormData] = useState(initialState);
    const [formDataDirect, setFormDataDirect] = useState(initialState_DirectUpload);
    const [excelData, setExcelData] = useState(null);
    const [excelFileName, setExcelFileName] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleChangeDirectUpload = (e) => {
        const { name, value } = e.target;
        setFormDataDirect({
            ...formDataDirect,
            [name]: value,
        });
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        setExcelFileName(file.name);

        const fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];

        if (file && fileTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                setExcelData(jsonData);
            };
            reader.readAsArrayBuffer(file);

            setFormData({
                ...formData,
                file: file,
            });
        } else {
            alert('Please select only Excel file types');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            year: formData.year,
            month: formData.month,
            resultList: excelData
        };

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}result`,
                data
            );
            if (res.status === 200) {
                alert("Record updated successfully");
                setFormData(initialState); // Reset form data to initial state
                setPost("")
            }
        } catch (error) {
            alert("Something went wrong");
        }
    };


    return (
        <>  
        {post === "excelUpload" && <div style={{ background: "rgba(0,0,0,0.6)" }} className="position-fixed start-0  w-100 h-100 top-0 d-flex justify-content-center align-items-center py-3 px-5 rounded">
            <form onSubmit={handleSubmit} className="col-md-6 p-5 bg-body position-relative rounded">
                <button style={{ right: "3px", top: "3px", border: "1px solid var(--myTheme-color)", color: "var(--myTheme-color)" }} className="position-absolute   px-2   bg- rounded-pill " onClick={() => setPost("")} > X </button>
                <div className="form-group ">
                    <label htmlFor="year">Year</label>
                    <input
                        type="text"
                        className="form-control"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="month">Month</label>
                    <select
                        className="form-control"
                        id="month"
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="file">Upload File</label>
                    <input
                        type="file"
                        className="form-control"
                        id="file"
                        name="file"
                        onChange={handleFile}
                        required
                    />
                </div>
                <button
                    style={{ background: "var(--myTheme-color)" }}
                    type="submit"
                    className="border-0 px-5 py-2 rounded text-white mt-3"
                >
                    Submit
                </button>
            </form>
        </div>}


            {post === "directUpload" && <div style={{ background: "rgba(0,0,0,0.6)" }} className="position-fixed start-0  w-100 h-100 top-0 d-flex justify-content-center align-items-center py-3 px-5 rounded">
                <form onSubmit={handleSubmit} className="col-md-6 p-5 bg-body position-relative rounded  d-flex flex-column">
                    <button style={{ right: "3px", top: "3px", border: "1px solid var(--myTheme-color)", color: "var(--myTheme-color)" }} className="position-absolute   px-2   bg- rounded-pill " onClick={() => setPost("")} > X </button>
                    <div  className="form-group">
                        <label htmlFor="date" style={{ paddingLeft: "3px", }} >Select date</label>
                        <input
                            type="date"
                            className="form-control "
                            style={{ border: "1px solid blue" }}
                            id="date"
                            name="date"
                            value={formDataDirect.date}
                            onChange={handleChangeDirectUpload}
                            required
                        />
                    </div>
                    <div style={{ flexWrap: "wrap", border: "1px solid blue" }} className="d-flex mt-4  p-3 rounded gap-1">


                        <div className="form-group col-12 d-flex rounded justify-content-between" style={{ border: "1px solid blue" }}  >
                            <label htmlFor="delhiLuckyBazar" style={{ paddingLeft: "3px", width: "140px" }} >Delhi Lucky Bazar</label>
                            <input
                                type="text"
                                style={{ border: "1px solid blue", marginRight: "2px" }}
                                className="py-1 rounded w-25"
                                id="delhiLuckyBazar"
                                name="delhiLuckyBazar"
                                value={formDataDirect.delhiLuckyBazar}
                                onChange={handleChangeDirectUpload}

                            />
                        </div>
                        <div className="form-group col-12 d-flex rounded justify-content-between" style={{ border: "1px solid blue" }}  >
                            <label htmlFor="disawer" style={{ paddingLeft: "3px", width: "140px" }} >Disawer</label>
                            <input
                                type="text"
                                style={{ border: "1px solid blue", marginRight: "2px", marginTop: "2px", marginBottom: "2px" }}
                                className="py-1 rounded w-25"
                                id="disawer"
                                name="disawer"
                                value={formDataDirect.disawer}
                                onChange={handleChangeDirectUpload}

                            />
                        </div>
                        <div className="form-group col-12 d-flex rounded justify-content-between" style={{ border: "1px solid blue" }}  >
                            <label htmlFor="faridabad" style={{ paddingLeft: "3px", width: "140px" }} >Faridabad</label>
                            <input
                                type="text"
                                style={{ border: "1px solid blue", marginRight: "2px", marginTop: "2px", marginBottom: "2px" }}
                                className="py-1 rounded w-25"
                                id="faridabad"
                                name="faridabad"
                                value={formDataDirect.faridabad}
                                onChange={handleChangeDirectUpload}

                            />
                        </div>
                        <div className="form-group col-12 d-flex rounded justify-content-between" style={{ border: "1px solid blue" }}  >
                            <label htmlFor="gaziyabad" style={{ paddingLeft: "3px", width: "140px" }} >Gaziyabad</label>
                            <input
                                type="text"
                                style={{ border: "1px solid blue", marginRight: "2px", marginTop: "2px", marginBottom: "2px" }}
                                className="py-1 rounded w-25"
                                id="gaziyabad"
                                name="gaziyabad"
                                value={formDataDirect.gaziyabad}
                                onChange={handleChangeDirectUpload}

                            />
                        </div>
                        <div className="form-group col-12 d-flex rounded justify-content-between" style={{ border: "1px solid blue" }}  >
                            <label htmlFor="kolkataKing" style={{ paddingLeft: "3px", width: "140px" }} >kolkata King</label>
                            <input
                                type="text"
                                style={{ border: "1px solid blue", marginRight: "2px", marginTop: "2px", marginBottom: "2px" }}
                                className="py-1 rounded w-25"
                                id="kolkataKing"
                                name="kolkataKing"
                                value={formDataDirect.kolkataKing}
                                onChange={handleChangeDirectUpload}

                            />
                        </div>

                        <div className="form-group col-12 d-flex rounded justify-content-between" style={{  border: "1px solid blue" }}  >
                            <label htmlFor="gali" style={{ paddingLeft: "3px", width: "140px" }} >Gali</label>
                            <input
                                type="text"
                                style={{ border: "1px solid blue", marginRight: "2px", marginTop: "2px", marginBottom: "2px" }}
                                className="py-1 rounded w-25"
                                id="gali"
                                name="gali"
                                value={formDataDirect.gali}
                                onChange={handleChangeDirectUpload}

                            />
                        </div>
                        <div className="form-group col-12 d-flex rounded justify-content-between" style={{  border: "1px solid blue" }}  >
                            <label htmlFor="delhiBazar" style={{ paddingLeft: "3px", width: "140px" }} >Delhi Bazar</label>
                            <input
                                type="text"
                                style={{ border: "1px solid blue", marginRight: "2px", marginTop: "2px", marginBottom: "2px" }}
                                className="py-1 rounded w-25"
                                id="delhiBazar"
                                name="delhiBazar"
                                value={formDataDirect.delhiBazar}
                                onChange={handleChangeDirectUpload}

                            />
                        </div>
                        <div className="form-group col-12 d-flex rounded justify-content-between" style={{  border: "1px solid blue" }}  >
                            <label htmlFor="shreeGanesh" style={{ paddingLeft: "3px", width: "140px" }} >Shree Ganesh</label>
                            <input
                                type="text"
                                style={{ border: "1px solid blue", marginRight: "2px", marginTop: "2px", marginBottom: "2px" }}
                                className="py-1 rounded w-25"
                                id="shreeGanesh"
                                name="shreeGanesh"
                                value={formDataDirect.shreeGanesh}
                                onChange={handleChangeDirectUpload}

                            />
                        </div>

                    </div>


                    <button
                        style={{ background: "var(--myTheme-color)" }}
                        type="submit"
                        className="border-0 px-5 py-2 rounded text-white mt-3"
                        onClick={async (e) => {
                            e.preventDefault();
                            const month = new Date(formDataDirect.date).getMonth() + 1
                            const year = formDataDirect.date.split("-")[0]
                            const day = formDataDirect.date.split("-")[2]
                            const resultList = [{
                                day: parseInt(day),
                                delhiLuckyBazar: parseInt(formDataDirect.delhiLuckyBazar),
                                disawer: parseInt(formDataDirect.disawer),
                                faridabad: parseInt(formDataDirect.faridabad),
                                gaziyabad: parseInt(formDataDirect.gaziyabad),
                                kolkataKing: parseInt(formDataDirect.kolkataKing),
                                gali: parseInt(formDataDirect.gali),
                                delhiBazar: parseInt(formDataDirect.delhiBazar),
                                shreeGanesh: parseInt(formDataDirect.shreeGanesh)
                            }]
                            const data = {
                                year, month, resultList
                            }

                            console.log(formDataDirect);


                            try {
                                const response = await axios.post(`${process.env.REACT_APP_API}result`,
                                    data);
                               if(response.status===200){
                                alert('data upload successfully')
                                setFormDataDirect(initialState_DirectUpload)
                               }
                            } catch (error) {
                                console.error('Error submitting form:', error);
                            }
                        }
                        }
                    >
                        Submit
                    </button>
                </form>
            </div>}
















            <div className="d-flex gap-3">


                {post === "" &&
                    <button style={{ border: "1px solid blue" }} className="btn " onClick={() => { setPost("excelUpload"); setEdit(""); setFormData(initialState) }}     >
                        Post
                    </button>
                }


                {<button style={{ border: "1px solid blue" }} className="btn " onClick={() => { setPost("directUpload"); setEdit(""); setFormData(initialState) }}     >
                    Post Single Day
                </button>}
               

            </div>

            <div>
                {chartAll && chartAll.map((e, i) => {
                    return (
                        <div style={{ border: "4px solid var(--myTheme-color)" }} className='  py-4 px-5 rounded-2 m-auto my-2 d-flex' key={i}>
                            <div className="d-flex flex-column w-100">
                                <p className="fw-bold"> Satta Result </p>
                                <div className="d-flex gap-4">

                                    <h6 className=''> Year : <span style={{ color: "red" }}
                                    > {e.year}</span>  </h6>

                                    <h6 className=''> Month : <span style={{ color: "red" }}> {monthNames[e.month - 1]}</span> </h6>
                                </div>
                            </div>
                            <div className="d-flex gap-1 w-25  align-items-center">
                                {/* <button className="btn btn-sm btn-success r"  onClick={() => {
                                    setPost(true);
                                    setEdit(e._id)
                                    setFormData({
                                        ...formData,
                                        title: e.title,
                                        about: e.about,
                                        fees: e.fees,
                                        name: e.name,
                                        number: e.number,
                                        validation: e.validation

                                    });

                                }}    >Edit</button> */}
                                <button className="btn btn-sm btn-danger w-50" onClick={async () => {
                                    try {
                                        const res = await axios.delete(
                                            `${process.env.REACT_APP_API}result/${e._id}`,
                                        );
                                        if (res.status === 200) {
                                            const afterDelete = chartAll.filter(advertise => advertise._id !== e._id)
                                            updatedAdArray([...afterDelete], 'ALL_RESULT_SATTA')

                                        }
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }}   > Delete</button>
                            </div>

                        </div>
                    );
                })}
            </div>

        </>
    );
};

export default Result;
