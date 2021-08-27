from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

#import models
from django.apps import apps
from rest_framework.serializers import Serializer
from .models import Cart, Product
Post = apps.get_model('blog', 'Post')
from rest_framework.authtoken.models import Token

#import serializers
from .serializers import CartSerializer, PostSerializer, ShopSerializer, RegistrationSerializer, CreatePostSerializer



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
@permission_classes((IsAuthenticated,))
def createPost(request):
    user = request.user
    post = Post(author=user)
    serializer = CreatePostSerializer(post,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def updatePost(request, post_id):
    post = Post.objects.get(id=post_id)
    user = request.user
    if post.author != user:
        return Response({'response': "You don't have permission to edit that."})
    serializer = PostSerializer(instance=post, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)
 

@api_view(["DELETE"])
@permission_classes((IsAuthenticated,))
def deletePost(request, post_id):
    post = Post.objects.get(id=post_id)
    user = request.user
    if post.author != user:
        return Response({'response': "You don't have permission to edit that."})
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

@api_view(["POST"])
def register(request):
    serializer = RegistrationSerializer(data = request.data)
    if serializer.is_valid():
        account = serializer.save()
        token = Token.objects.get(user=account).key
        data = {
            'response': "Successfully registered a new user.",
            'email': account.email,
            'username': account.username,
            'token': token,
        }
    else:
        data = serializer.errors
    return Response(data)

@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def addCart(request):
    serializer = CartSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("Successfully added to cart")
    else:
        print("addCart did not work.")
        return Response(serializer.errors)

@api_view(["GET"])
def myCart(request,username):
    cart = Cart.objects.filter(username = username)
    serializer = CartSerializer(cart, many=True)
    print("view Cart response went through")
    return Response(serializer.data)

@api_view(["DELETE"])
@permission_classes((IsAuthenticated,))
def deleteCart(request, username, cart_id):

    cartItem = Cart.objects.get(cart_id=cart_id)
    if cartItem.username != username:
        return Response({"messages": "You do not have permission to delete this item."})
    cartItem.delete()
    return Response({"messages": "Successfully deleted the item."})