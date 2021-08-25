from django.db import models

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