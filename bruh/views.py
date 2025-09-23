from django.shortcuts import render, redirect, get_object_or_404
from .models import Task
from django.views.decorators.http import require_POST

def index(request):
    """
    Renders the main to-do list page and displays all tasks.
    """
    tasks = Task.objects.all().order_by('-created_at')
    context = {'tasks': tasks}
    return render(request, 'bruh/index.html', context)

@require_POST
def add(request):
    """
    Handles form submission to add a new task to the database.
    """
    title = request.POST.get('title')
    if title:
        new_task = Task(title=title)
        new_task.save()
    return redirect('index')

def complete(request, task_id):
    """
    Toggles the 'completed' status of a specific task.
    """
    task = get_object_or_404(Task, pk=task_id)
    task.completed = not task.completed
    task.save()
    return redirect('index')

def delete(request, task_id):
    """
    Deletes a specific task from the database.
    """
    task = get_object_or_404(Task, pk=task_id)
    task.delete()
    return redirect('index')
