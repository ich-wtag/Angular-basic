import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "src/app/Models/course";
import { CourseService } from "src/app/Services/course.service";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.component.html",
  styleUrls: ["./course-detail.component.css"],
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  selectedCourse: Course;
  courseId: number;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  paramMapsObs;

  // courseService: CourseService = inject(CourseService);

  constructor(private courseService: CourseService) {
    // console.log("courseService", courseService);
  }

  ngOnInit() {
    // this.courseId = this.activeRoute.snapshot.params["id"];
    // this.courseId = +this.activeRoute.snapshot.paramMap.get("id");

    // this.activeRoute.params.subscribe((data) => {
    //   this.courseId = +data["id"];

    //   this.selectedCourse = this.courseService.courses.find(
    //     (course) => course.id === this.courseId
    //   );
    // });
    this.paramMapsObs = this.activeRoute.paramMap.subscribe((data) => {
      this.courseId = +data.get("id");

      this.selectedCourse = this.courseService.courses.find(
        (course) => course.id === this.courseId
      );
    });
  }

  ngOnDestroy() {
    this.paramMapsObs.unsubscribe();
  }
}
