from django.db import models

class Task(models.Model):
    """
    A simple model to represent a to-do list task.
    """
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """
        String representation of the Task model.
        """
        return self.title
