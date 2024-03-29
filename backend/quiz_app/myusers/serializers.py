from rest_framework import serializers
from .models import MyUser,Token

class RegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = MyUser
		fields = "__all__"

	def create(self, validated_data):
		return MyUser.objects.create(**validated_data)

	def update(self , instance, validated_data):
		for key,value in validated_data.items():
			setattr(instance, key ,value)
		instance.save()
		return instance 

class TokenSerializer(serializers.ModelSerializer):
	class Meta:
		model = Token
		fields = "__all__"

	def create(self, validated_data):
		return Token.objects.create(**validated_data)

	def update(self , instance, validated_data):
		for key,value in validated_data.items():
			setattr(instance, key ,value)
		instance.save()
		return instance 