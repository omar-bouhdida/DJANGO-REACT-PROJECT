from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Item endpoints
    path('items/', views.ItemList.as_view(), name='item-list'),
    path('items/<int:pk>/', views.ItemDetail.as_view(), name='item-detail'),

    # User endpoints
    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),

    # Registration and token endpoints
    path('register/', views.UserRegistration.as_view(), name='user-registration'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

# Support for different formats in API responses
urlpatterns = format_suffix_patterns(urlpatterns)
