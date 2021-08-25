from rest_framework import serializers 

#import models 
from django.apps import apps
from .models import Product

Post = apps.get_model('blog', 'Post')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'