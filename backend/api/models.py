from django.db import models
from django.contrib.auth.models import User

class Item(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='items')
    
    def __str__(self):
        return self.title