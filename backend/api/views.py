from rest_framework import generics, permissions
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .models import Item
from .serializers import ItemSerializer, UserSerializer, UserRegistrationSerializer

# List and create items
class ItemList(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Read-Only for unauthenticated users, but requires auth to create

    def perform_create(self, serializer):
        # Assign the logged-in user as the owner when creating an item
        serializer.save(owner=self.request.user)

# Retrieve, update, or delete a specific item
class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]  # Requires authentication for edit or delete

# List of users
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Requires authentication to list users

# User details
class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Requires authentication to access user details

# User registration
class UserRegistration(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]  # No authentication required for registration
