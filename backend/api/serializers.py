from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Item
from django.core.exceptions import ValidationError

class ItemSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    
    class Meta:
        model = Item
        fields = ['id', 'title', 'description', 'created_at', 'owner']

class UserSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)  # Display full item details instead of just ids
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'items']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirmation']
    
    def validate(self, data):
        """
        Check that the password and password_confirmation match.
        """
        if data['password'] != data['password_confirmation']:
            raise ValidationError("Passwords must match.")
        return data

    def create(self, validated_data):
        """
        Create a new user, ensuring the password is hashed.
        """
        validated_data.pop('password_confirmation')  # We no longer need password_confirmation
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
