package com.ousaro.gamindie.feedback;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ousaro.gamindie.commun.PageResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("comments")
@RequiredArgsConstructor
@Tag(name="Comment")
public class CommentController {

    private final CommentService commentService;


    @PostMapping("/")
    public ResponseEntity<Integer> createComment(@Valid @RequestBody CommentRequest request , Authentication connectedUser) {
        return ResponseEntity.ok(commentService.createComment(request, connectedUser));
    }

    @GetMapping("/")
    public ResponseEntity<PageResponse<CommentResponse>> getTopLevelComments(
        @RequestParam(name="postId") int postId,
        @RequestParam(name="page", defaultValue="0") int page,
        @RequestParam(name="size", defaultValue="10") int size
    ) {
        return ResponseEntity.ok(commentService.getTopLevelComments(postId,page,size));
    }

    @GetMapping("/{id}/replies")
    public ResponseEntity<PageResponse<CommentResponse>> getDirectReplies(
        @PathVariable Integer id,
        @RequestParam(name="page", defaultValue="0") int page,
        @RequestParam(name="size", defaultValue="10") int size
    ) {
        return ResponseEntity.ok(commentService.getDirectReplies(id, page, size));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Integer id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count/{postId}")
    public ResponseEntity<Long> countComments(@PathVariable Integer postId) {
        return ResponseEntity.ok(commentService.countComments(postId));
    }
}
