# adapted from https://github.com/capjamesg/cv-book-svg/blob/main/grounded.py
# %%
# import base64
import json
from pathlib import Path

import cv2
import supervision as sv
import yaml
from autodistill.detection import CaptionOntology
from autodistill_grounded_sam import GroundedSAM
from rdp_algo import rdp
from tqdm import tqdm

# import matplotlib.pyplot as plt
# import numpy as np
# import requests
# %%

this_dir = Path(__file__).parent
repo_root = this_dir.parent
image_dir = repo_root / "img" / "cropped"
output_dir = repo_root / "content"
# %%
base_model = GroundedSAM(
    ontology=CaptionOntology({"book spine": "book spine"}), box_threshold=0.1
)


# %%
def process_image(img_file: Path):
    output_file = (
        output_dir / img_file.parent.name / img_file.name.replace(".jpg", ".yaml")
    )
    output_file.parent.mkdir(parents=True, exist_ok=True)
    img = cv2.imread(img_file)
    results = base_model.predict(img)  # ~40s per image
    polygons = [sv.mask_to_polygons(mask) for mask in results.mask]
    out: list[list[list[list[int]]]] = [[] for _ in polygons]
    for i, poly in enumerate(polygons):
        simplified: list[list[list[int]]] = [[] for _ in poly]
        for j, line in enumerate(poly):
            simplified[j] = [[int(x) for x in k] for k in rdp(line, epsilon=1)]
        out[i] = simplified
    with output_file.open("w") as f:
        json.dump(out, f)


# %%
output_dir.mkdir(parents=True, exist_ok=True)
todo = sorted(image_dir.glob("*/*.jpg"))
for img_file in tqdm(todo):
    process_image(img_file)
# %%
# def show_mask(i: int):
#     mask = results.mask[i]
#     # mask = mask[0:1]
#     masked_region = np.zeros_like(img)
#     masked_region[mask] = img[mask]
#     plt.imshow(masked_region)

# %%
# import pytesseract

# pytesseract.pytesseract.tesseract_cmd = (
#     r"/nix/store/w49sbg5v9589z1jrjbv07c1fjhixyh6s-tesseract-5.5.0/bin/tesseract"
# )

# %%
# mask = results.mask[28]
# masked_region = np.zeros_like(img)
# masked_region[mask] = img[mask]
# masked_rbg = cv2.cvtColor(masked_region, cv2.COLOR_BGR2RGB)
# plt.imshow(masked_rbg)
# %%

# # pytesseract.image_to_string(cv2.rotate(masked_rbg, cv2.ROTATE_90_COUNTERCLOCKWISE))
# pytesseract.image_to_string(masked_rbg, lang="eng")
# %%

# # %%
# [dict(i=i, len=len(p)) for i, p in enumerate(polygons) if len(p) != 1]
# # %%
# len(polygons)
# # %%

# for p in polygons:
#     pre = p[0]
#     post = rdp(pre, epsilon=1)
#     print(f"{len(pre)}\t{len(post)}\t{len(post)/len(pre)}")

# # %%
# [[len(seg) for seg in p] for p in polygons]
# # %%
# for p in polygons:
#     segments = [len(seg) for seg in p]
#     try:
#         max(*segments)
#     except:
#         print(segments)
#     # assert segments[0] == max(*segments)
# %%
# note: can't assume which segment of polygon is the actual spine
