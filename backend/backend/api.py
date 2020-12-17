from rest_framework.routers import DefaultRouter
from rest_framework_extensions.routers import NestedRouterMixin
from core.views import CommentViewSet, PostViewSet, UserList

router = DefaultRouter()

# router.register('user', UserList, basename='user')
# router.register('user_data', UserDataViewSet)
router.register('posts', PostViewSet)
router.register('comments', CommentViewSet)

class NestedDefaultRouter(NestedRouterMixin, DefaultRouter):
    pass

router = NestedDefaultRouter()

posts_router = router.register('posts', PostViewSet)
posts_router.register(
        'comments',
        CommentViewSet,
        basename='user-posts-comments',
        parents_query_lookups=['post_id', 'post']
    )


