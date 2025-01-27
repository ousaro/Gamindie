package com.ousaro.gamindie.post;



import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.ousaro.gamindie.attachment.Attachment;
import com.ousaro.gamindie.attachment.AttachmentRepository;
import com.ousaro.gamindie.commun.PageResponse;
import com.ousaro.gamindie.user.User;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
    
    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final AttachmentRepository attachmentRepository;

    public Integer create(PostRequest request, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());

        List<Attachment> attachments = null;
        if(request.attachmentIds() != null && !request.attachmentIds().isEmpty()) {
            attachments = attachmentRepository.findAllById(request.attachmentIds());
        }
        
        Post post = postMapper.toPost(request, attachments);
        post.setOwner(user);
         // Save the post
        Post savedPost = postRepository.save(post);

        // Update the attachments to associate them with the saved post
        if (attachments != null) {
            for (Attachment attachment : attachments) {
                attachment.setPost(savedPost);
            }
            attachmentRepository.saveAll(attachments);
        }

        return savedPost.getId();
    }

    public PostResponse findById(Integer postId) {
        
        return postRepository.findById(postId)
            .map(postMapper::toPostResponse) // map the post to a PostResponse
            .orElseThrow(() -> new EntityNotFoundException("No Post found with id " + postId));
    }

    public PageResponse<PostResponse> findAllPosts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdData").descending());
        Page<Post> posts = postRepository.findAll(pageable);
        List<PostResponse> postResponses = posts.stream()
            .map(postMapper::toPostResponse)
            .toList();
        return new PageResponse<>(
            postResponses,
            posts.getNumber(),
            posts.getSize(),
            posts.getTotalElements(),
            posts.getTotalPages(),
            posts.isFirst(),
            posts.isLast()
        );
    }

    public PageResponse<PostResponse> findAllPostsByOwner(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdData").descending());
        Page<Post> posts = postRepository.findAll(PostSpecification.withOwner(user.getId()), pageable);
        List<PostResponse> postResponses = posts.stream()
            .map(postMapper::toPostResponse)
            .toList();
        return new PageResponse<>(
            postResponses,
            posts.getNumber(),
            posts.getSize(),
            posts.getTotalElements(),
            posts.getTotalPages(),
            posts.isFirst(),
            posts.isLast()
        );
    }

    
}
