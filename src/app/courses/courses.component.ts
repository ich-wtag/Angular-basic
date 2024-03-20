import { Component, OnInit, inject } from '@angular/core';
import { Course } from '../Models/course';
import { CourseService } from '../Services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  coursesService = inject(CourseService);
  AllCourses: Course[];
  searchString: string;

  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    // this.searchString = this.activeRoute.snapshot.queryParamMap.get("search");

    this.activeRoute.queryParamMap.subscribe((data) => {
      this.searchString = data.get('search');

      if (
        this.searchString === undefined ||
        this.searchString === null ||
        this.searchString === ''
      ) {
        this.AllCourses = this.activeRoute.snapshot.data['courses'];
      } else {
        this.AllCourses = this.coursesService.courses.filter((course) =>
          course.title.toLowerCase().includes(this.searchString.toLowerCase())
        );
      }
    });
  }
}
