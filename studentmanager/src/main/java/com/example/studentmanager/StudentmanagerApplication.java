package com.example.studentmanager;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@SpringBootApplication
public class StudentmanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentmanagerApplication.class, args);
		System.out.println("Hello World");
	}

	@GetMapping("/hello")
    public String hello() {
        return "Hello Spring Boot API";
    }

	@GetMapping("/student/{id}")
	public String getStudentById(@PathVariable Long id) {
		// Logic to retrieve student by ID
		return "Student with ID: " + id;
	}
	
	@GetMapping("/student")
	public String greet(@RequestParam String name) {
		return "Xin chào " + name;
	}

	@GetMapping("/searchstudent")
	public String searchStudent(@RequestParam String name,
							@RequestParam(defaultValue = "1") int age) {
		return "Tên=" + name + ", tuổi=" + age;
	}

	@GetMapping("/studentall")
	public List<Student> getStudents() {
		List<Student> list = new ArrayList<>();
		list.add(new Student(1, "A", 20));
		list.add(new Student(2, "B", 21));
		return list;
	}

	@GetMapping("/getstudent")
	public String getStudents(
			@RequestHeader("Authorization") String authorization) {

		return "Authorization = " + authorization;
	}


}
