import React, { useState, useEffect } from 'react';
import api from '../api';

import CourseCard from './CourseCard';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/api/courses');

        console.log('courses', response.data);

        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses', error);
      }
    };

    fetchCourses();
  }, []);

  const sortCourses = () => {
    if(!sorted) {
      const sortedList = courses.sort((a, b) => a.title.localeCompare(b.title));
      setCourses(sortedList);
      setSorted(true);
    }
    else {
      const reversedList = courses.reverse();
      setCourses(reversedList);
      setSorted(false);
    }
  }

  return (
    <div>
      <h2>All Courses</h2>
      <button onClick={sortCourses}>Sort Courses</button>
      <div className="course-list">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
