import { useState, useEffect } from "react";

function Task() {
  const initialValues = { date: "", amount: "", payment: "", remark: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [records,setRecords]=useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    const newRecored={...formValues  }
    setIsSubmit(true);
    setRecords([...records,newRecored])
    setFormValues({date: "", amount: "", payment: "", remark: "" })
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};

    if (!values.date) {
      errors.date = "Date is required!";
    }
    if (!values.amount) {
      errors.amount = "Amount is required!";
    }
    if (!values.payment) {
      errors.payment = "Payment is required";
    }
    if (!values.remark) {
      errors.remark = "remark is required";
    }
    return errors;
  };

  return (
    <>
    <div className="container ">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className=" font-bold text-white text-2xl font-mono text-center animate-bounce">
          Receipt in successfully Submited 
        </div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}

      <form onSubmit={handleSubmit} className="">
        <h1 className="underline underline-offset-4 font-bold tracking-widest decoration-blue-600">
          Reseipt Details
        </h1>
        <div className="flex flex-col gap-y-2  font-mono mt-5">
          <div className=" flex gap-20 ">
            <label className="font-bold">Date*</label>
            <input
              type="date"
              name="date"
              id="date"
              placeholder="Enter Date"
              value={formValues.date}
              onChange={handleChange}
              className="outline outline-1 rounded-md"
            />
          </div>
          <p>{formErrors.date}</p>
          <div className=" flex gap-16">
            <label className="font-bold">Amount*</label>
            <input
              type="text"
              name="amount"
              id="amount"
              placeholder="Enter Amount (in INR)"
              value={formValues.amount}
              onChange={handleChange}
              className="outline outline-1 rounded-md "
            />
          </div>
          <p>{formErrors.amount}</p>
          <div className="flex gap-3 ">
            <label className="font-bold">Payment Mode*</label>

            <select
              name="payment"
              id="payment"
              value={formValues.payment}
              onChange={handleChange}
              className="outline outline-1 rounded-md "
            >
              <option>select</option>
              <option className="" value={formValues.cash}>
                Cash
              </option>
              <option className="" value={formValues.card}>
                Card
              </option>
            </select>
          </div>
          <p>{formErrors.payment}</p>
          <div className=" flex gap-16">
            <label className="font-bold">Remark*</label>
            <input
              type="text"
              name="remark"
              id="remark"
              placeholder="Enter Remark"
              value={formValues.remark}
              onChange={handleChange}
              className="outline outline-1 rounded-md "
            />
          </div>
          <p>{formErrors.remark}</p>
          <div className="text-center flex justify-center">
            <p
              onClick={() => setFormValues(initialValues)}
              className="cursor-pointer text-white bg-red-500 px-4 py-1 rounded-md"
            >
              Cancel
            </p>
            <button className="ml-10 bg-green-500 px-4 py-1 text-white rounded-md">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    <div className="flex justify-center mb-10">
    {
      records.map((item)=>{
        return(
          <div className="text-black w-[700px] h-[50px] bg-white flex justify-around items-center rounded-lg text-xl font-bold font-mono">
            <h1>{item.date}</h1>
            <h1>{item.amount}</h1>
            <h1>{item.payment}</h1>
            <h1>{item.remark}</h1>
          </div>
        )
      })
    }
    </div>
    </>
  );
}

export default Task;
