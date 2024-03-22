import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const initialState = {
  label: '',
};

function CategoryForm() {
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Create a Category</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Categories are used to categorize content.
          </p>
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Category Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="label"
                    id="label"
                    autoComplete="label"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Name"
                    value={formInput.label}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit"> Submit </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CategoryForm;
