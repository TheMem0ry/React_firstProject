import React from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
const PostFilter = ({filter, setFilter}) => {

// const [selectedSort, setSelectedSort] = useState('')
// const [searchQuery, setSearchQuery] = useState('')

    return (
        <div>
      <MyInput 
        value = {filter.query}
        placeholder='Search Input'
        onChange = {e => setFilter({...filter, query: e.target.value})}
      />
      <MySelect 
      value={filter.sort}
      onChange={selectedSort => setFilter({...filter, sort:selectedSort})}
      defaultValue='Sorting by'
      options={[
        {value:'title', name:'Sort by Title'},
        {value:'body', name:'Sort by Description'}
      ]}/>
      </div>
    )
}

export default PostFilter;