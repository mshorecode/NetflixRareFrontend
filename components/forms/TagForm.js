import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { createTag } from '../../api/tagsAPI';

const initialState = {
  label: '',
};

function TagForm() {
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
    };
    createTag(payload).then(() => setFormInput(initialState));
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Create a Tag</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Tags are used to categorize content length.
          </p>
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Tag Name
              </label>
              <div className="mt-2">
                <div className="flex focus-within:ring-0 focus-within:ring-inset sm:max-w-md mb-4">
                  <input
                    type="text"
                    name="label"
                    id="label"
                    autoComplete="label"
                    className="outline-none block flex-1 border-b border-slate-500 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    value={formInput.label}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                </div>
                <Button type="submit" className="bg-slate-800 border-none hover:bg-slate-800 text-white font-semibold rounded-sm mt-2"> Submit </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default TagForm;
