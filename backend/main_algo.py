# TODO: apply RAKE to see if determinants drop off
# TODO: spaCy Matcher object
# TODO: do stop words matter? why am I still here?

# TODO: find set of segmentations for text
# TODO: creating ranking for best N segmentations

# TODO: idea -- rank chunks with capitals higher
# TODO: idea -- some weight (not as much) for longer noun chunks
# TODO: idea -- add weight for number of graph neighbors (connectedness)?

# TODO: external checks e.g. very semantic details (be careful!)
# TODO: implement toxicity checking

import spacy
import json
import sys
# from spacy import displacy 

# import nltk
# nltk.download('stopwords')
# nltk.download('punkt')
from rake_nltk import Rake, Metric

# load english language model
nlp = spacy.load('en_core_web_sm',disable=['ner','textcat'])

# Input text, to be sent from frontend
# There's definitely "prompt engineering" to be done
# precondition: assume that text is capped at some amount of characters

text = sys.argv[1]

OUTPUT_PATH = ""
OUTPUT_FILENAME = "output.json"
if len(sys.argv) == 3:  # there is a second argument
    OUTPUT_PATH = sys.argv[2]
    if OUTPUT_PATH.endswith("/"):
        OUTPUT_PATH += OUTPUT_FILENAME
else:
    OUTPUT_PATH = OUTPUT_FILENAME  # set output path to be 'output.json'


# text = """
#         Blue-haired anime girl sitting in a field of violet flowers and grass at golden hour, camera angle slightly lower pointing up, she is wearing a straw hat and sundress, and the style is inspired by Monet
#        """

# remove whitespace
text = text.strip()

if " " not in text:  # we have something that's one line!
    with open(OUTPUT_PATH, "w") as f:
        json.dump([text], f)
    exit()

# create spacy (tokenization, tagging, dependency, etc.)
doc = nlp(text)

# Print part of speech for each token
# for token in doc:
#     print(token.text,'->',token.pos_)

# render sequential dependency graph
# displacy.render(doc, style='dep')
# print()


# Get all noun subjects and direct objects
# Sidenote: you could definitely throw a GNN at this, would be cool
# for token in doc:
#     # extract subject
#     if token.dep_=='nsubj':
#         print(token.text)
#     # extract object
#     elif token.dep_=='dobj':
#         print(token.text)

# print()

# Get noun chunks
ansarr = []
for chunk in doc.noun_chunks:
    ans = ""
    if chunk.root.dep_ == 'pobj' or chunk.root.dep_ == 'dobj':  # object of preposition or direct object
        ans = chunk.root.head.text + " " + chunk.text
        # print(chunk.root.head.text, chunk.text, chunk.root.pos_)
    else:
        ans = chunk.text + " " + chunk.root.head.text
        # print(chunk.text, chunk.root.head.text, chunk.root.pos_)
    # print(chunk.text, chunk.root.head.text, " | ", chunk.root.dep_, chunk.root.text)
    ansarr.append(ans)

r = Rake(ranking_metric=Metric.WORD_DEGREE, min_length=2)
r.extract_keywords_from_text(text)

phrases = r.get_ranked_phrases_with_scores()

# print()

# for token in doc:
#     print(token.text, token.dep_, token.head.text, token.head.pos_, [child for child in token.children])

# print()

# from spacy.symbols import nsubj, VERB

# verbs = set()
# for possible_subject in doc:
#     if possible_subject.dep == nsubj and possible_subject.head.pos == VERB:
#         verbs.add(possible_subject.head)
# print(verbs)

# TODO: Tree algorithms?
# print()
# root = [token for token in doc if token.head == token][0]
# subject = list(root.lefts)[0]
# for descendant in subject.subtree:
#     assert subject is descendant or subject.is_ancestor(descendant)
#     print(descendant.text, descendant.dep_, descendant.n_lefts,
#             descendant.n_rights,
#             [ancestor.text for ancestor in descendant.ancestors])

# TODO: Test out DFS
# graph = {
#     'A' : ['B','C'],
#     'B' : ['D', 'E'],
#     'C' : ['F'],
#     'D' : [],
#     'E' : ['F'],
#     'F' : []
# }

# visited = set() # Set to keep track of visited nodes.

# def dfs(visited, graph, node):
#     if node not in visited:
#         print (node)
#         visited.add(node)
#         for neighbour in graph[node]:
#             dfs(visited, graph, neighbour)


def heuristic_adjustment(all_phrases):
    # Add a little something for capitals and length
    MAX_CAPITAL = 0.2
    MAX_LENGTH = 0.05

    capital_total = 0
    length_total = 0
    for i in range(len(all_phrases)):
        num_capitals = sum(1 for x in all_phrases[i] if x.isupper())
        all_phrases[i] = (all_phrases[i], num_capitals, len(all_phrases[i]))
        capital_total += num_capitals
        length_total += len(all_phrases[i])

    for i in range(len(all_phrases)):
        phrase, capitals, length = all_phrases[i]
        cap_add = 0
        if capital_total > 0:
            cap_add = MAX_CAPITAL * (capitals / capital_total)
        len_add = MAX_LENGTH * (length / length_total)
        all_phrases[i] = (phrase, cap_add + len_add)
    
    return all_phrases


# Create confidence values for spaCy using RAKE's confidence values
ansarr = heuristic_adjustment(ansarr)

ansarr2 = []
for i in range(len(ansarr)):
    orig_phrase, added_val = ansarr[i]
    maxVal = -1.0
    for confidence, rake_phrase in phrases:
        phraseMain = nlp(orig_phrase)
        phraseSecond = nlp(rake_phrase)
        
        # Compare without stop words to reduce bias
        main_no_stops = nlp(' '.join([str(t) for t in phraseMain if not t.is_stop]))
        secondary_no_stops = nlp(' '.join([str(t) for t in phraseSecond if not t.is_stop]))
        #print(main_no_stops.vector)
        #print(secondary_no_stops.vector)
        sim = main_no_stops.similarity(secondary_no_stops)

        if sim > maxVal:
            maxVal = sim

    ansarr2.append((orig_phrase, maxVal + added_val))

sorted_phrases = list(reversed(sorted(ansarr2, key = lambda x: x[1])))
sorted_phrases_only = [x for x, y in sorted_phrases]

# Write to JSON
with open(OUTPUT_PATH, "w") as f:
    json.dump(sorted_phrases_only, f)
