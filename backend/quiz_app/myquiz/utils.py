from rest_framework import status
from django.db.models import Q 

from mycourses.models import Course,user_in_course
from .models import *

def user_in_course_details(user,course_pk):
	user_course_util_data = {}
	course = "Not Valid"
	if user is not None:
		if user.verified == True:
			if course_pk!="":
				courses = Course.objects.filter(Q(pk=course_pk))
				if len(courses)==1:
					course = courses[0]
					relation = user_in_course.objects.filter(Q(user = user.pk) & Q(course=course_pk)).distinct()
					# print(relation,len(relation))
					if len(relation)==1:
					    user_course_util_data["allowed"] =True
					    user_course_util_data["relation"] = relation[0].role 
					else:
						user_course_util_data["allowed"] = False
						user_course_util_data["error_message"] = "User is not the part of the course" 
						user_course_util_data["status"] = status.HTTP_401_UNAUTHORIZED 
				else:
					user_course_util_data["allowed"] = False
					user_course_util_data["error_message"] = "No such course is found"
					user_course_util_data["status"] = status.HTTP_400_BAD_REQUEST 
			else:
				user_course_util_data["allowed"] = False
				user_course_util_data["error_message"] = "course_pk should not be empty"
				user_course_util_data["status"] = status.HTTP_400_BAD_REQUEST 
		else:
			user_course_util_data["allowed"] = False
			user_course_util_data["error_message"] = "First Activate your account"
			user_course_util_data["status"] = status.HTTP_400_BAD_REQUEST 
	else:
		user_course_util_data["allowed"] = False
		user_course_util_data["error_message"] = "No user is logged in"
		user_course_util_data["status"] = status.HTTP_401_UNAUTHORIZED 
	return user_course_util_data,course

def marks_for_a_question(question_type,question_answer,student_answer,positive_marks,negtive_marks,partial_allowed,option_count):
	if question_type!="M" or partial_allowed==False:
		if 	question_answer==student_answer:
			return positive_marks
		return -1*negtive_marks
	student_options = student_answer.split(';')
	correct_options = question_answer.split(';')
	for i in student_options:
		if i not in correct_options:
			return -1*negtive_marks
	return (len(student_options)/option_count)*positive_marks
