import React, { FormEventHandler } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';
import { IoSearch } from '@react-icons/all-files/io5/IoSearch';
import { TextInput } from '^components/TextInput';

interface SearchInputProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegisterReturn;
}

export function SearchInput<T>({
  onSubmit,
  register,
}: SearchInputProps) {
  return (
    <form onSubmit={onSubmit} className="relative">
      <TextInput
        placeholder="Search .."
        {...register}
      />
      <button type="submit" className="btn btn-link absolute top-0 text-gray-500" style={{ right: 0 }}>
        <IoSearch className="w-5 h-5" />
      </button>
    </form>
  )
}
