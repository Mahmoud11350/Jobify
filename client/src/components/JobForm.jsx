import { Form } from "react-router-dom";
const JobForm = ({ inputs, type, method }) => {
  return (
    <div className="bg-white my-8 mx-12 p-4 rounded-lg">
      <h4 className="mb-4 text-center ">
        {type == "newJob" ? "Add Job" : "Search"}
      </h4>
      <Form method={method} className="grid lg:grid-cols-3 items-end gap-4">
        {inputs.map((input) => {
          return (
            <div className=" mt-4 flex flex-col" key={input.name}>
              <label htmlFor={input.name} className="mb-2">
                {input.label}
              </label>
              {input.type == "text" ? (
                <input
                  type={input.type}
                  id={input.name}
                  name={input.name}
                  className="bg-background py-2 px-4 rounded"
                />
              ) : (
                <select
                  name={input.name}
                  className="bg-background py-2 px-4 rounded"
                >
                  {input.enum.map((option) => {
                    return (
                      <option
                        value={option}
                        name={input.name}
                        id={input.name}
                        key={option}
                      >
                        {option}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          );
        })}
        <button className="btn ">
          {" "}
          {type == "newJob"
            ? "Submit"
            : type == "editJob"
            ? "Edit Job"
            : "Reset Search Values"}
        </button>
      </Form>
    </div>
  );
};
export default JobForm;
