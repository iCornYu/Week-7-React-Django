from django.db import models

#Auth token Model Set Up
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver 
from rest_framework.authtoken.models import Token

# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length = 300)
    product_id = models.AutoField(primary_key=True)
    product_type = models.CharField(max_length = 100)
    content = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(blank=True, null=True)
    def __str__(self):
        return f'{self.product_id} | {self.product_type} | {self.price}'

#Create post_save/reciever 
@receiver(post_save, sender=User)
def createAuthToken(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Cart(models.Model):
    product = models.ForeignKey(Product, on_delete= models.CASCADE)
    username = models.CharField(max_length = 30)
    cart_id = models.AutoField(primary_key=True)

    def __str__(self):
        return f'{self.username} | {self.product}'