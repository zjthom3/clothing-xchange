from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=50)
    post_content = models.TextField(max_length=200)
    image = models.ImageField(blank=True, null=True)
    date_posted = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')

    def __str__(self):
        return self.title

class Comment(models.Model):
    comment_content = models.TextField(max_length=200)
    date_posted_comment = models.DateTimeField(default=timezone.now)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = models.TextField(max_length=50)

    def __str__(self):
        return self.comment_content

class UserAddress(models.Model):
    street = models.TextField(max_length=200)
    city = models.TextField(max_length=200)
    state_prov = models.TextField(max_length=200)
    zipcode = models.TextField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='useraddresses')