from rest_framework.decorators import api_view
from rest_framework.response import Response

#import models
from django.apps import apps
from rest_framework.serializers import Serializer
from .models import Product
Post = apps.get_model('blog', 'Post')

#import serializers
from .serializers import PostSerializer, ShopSerializer


# Create your views here.
@api_view(["GET"])
def index(request):
    return Response(
        {'hello': 'there'}
    )

@api_view(['GET'])
def posts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def individualPost(request, post_id):
    post = Post.objects.get(id=post_id)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)

@api_view(["POST"])
def createPost(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(["POST"])
def updatePost(request, post_id):
    post = Post.objects.get(id=post_id)
    serializer = PostSerializer(instance=post, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(["DELETE"])
def deletePost(request, post_id):
    post = Post.objects.get(id=post_id)
    post.delete()
    return Response({"messages": "Successfully deleted the post."})

@api_view(["GET"])
def products(request):
    products = Product.objects.all()
    serializer = ShopSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def individual(request, product_id):
    product = Product.objects.get(product_id=product_id)
    serializer = ShopSerializer(product, many=False)
    return Response(serializer.data)
